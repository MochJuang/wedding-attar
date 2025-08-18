import { motion, AnimatePresence } from 'framer-motion'
import Confetti from 'react-confetti';
import Marquee from "@/components/ui/marquee";
import {
    Calendar,
    Clock,
    ChevronDown,
    User,
    MessageCircle,
    Send,
    Smile,
    CheckCircle,
    XCircle,
    HelpCircle,
} from 'lucide-react'
import {useEffect, useState} from 'react';
import { formatEventDate } from '@/lib/formatEventDate';
import { collection, getDocs, addDoc, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./../firebase.js";


export default function Wishes() {
    const [showConfetti, setShowConfetti] = useState(false);
    const [newWish, setNewWish] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [attendance, setAttendance] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState('');
    const [wishes, setWishes] = useState([]);
    const [loading, setLoading] = useState(true);

    const options = [
        { value: 'ATTENDING', label: 'Ya, saya akan hadir' },
        { value: 'NOT_ATTENDING', label: 'Tidak, saya tidak bisa hadir' },
        { value: 'MAYBE', label: 'Mungkin, saya akan konfirmasi nanti' }
    ];

    // Real-time listener for wishes
    useEffect(() => {
        const q = query(collection(db, "wishes"), orderBy("timestamp", "desc"));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newData = querySnapshot.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id,
                // Convert Firestore timestamp to ISO string
                timestamp: doc.data().timestamp?.toDate()?.toISOString() || doc.data().createdAt
            }));
            setWishes(newData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching wishes:", error);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleSubmitWish = async (e) => {
        e.preventDefault();
        if (!newWish.trim() || !userName.trim() || !attendance) return;

        setIsSubmitting(true);

        try {
            const wishData = {
                name: userName.trim(),
                message: newWish.trim(),
                attending: attendance.toLowerCase().replace('_', '-'),
                timestamp: serverTimestamp(),
                createdAt: new Date().toISOString()
            };

            await addDoc(collection(db, "wishes"), wishData);

            // Clear form
            setNewWish('');
            setUserName('');
            setAttendance('');
            setShowConfetti(true);
            setTimeout(() => setShowConfetti(false), 3000);
        } catch (error) {
            console.error("Error adding wish:", error);
            alert('Gagal mengirim pesan. Silakan coba lagi.');
        }

        setIsSubmitting(false);
    };

    const getAttendanceIcon = (status) => {
        switch (status) {
            case 'attending':
                return <CheckCircle className="w-4 h-4 text-emerald-500" />;
            case 'not-attending':
                return <XCircle className="w-4 h-4 text-rose-500" />;
            case 'maybe':
                return <HelpCircle className="w-4 h-4 text-amber-500" />;
            default:
                return null;
        }
    };
    return (<>
        <section id="wishes" className="min-h-screen relative overflow-hidden">
            {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}
            <div className="container mx-auto px-4 py-20 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 mb-16"
                >
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="inline-block text-rose-500 font-medium"
                    >
                        Kirimkan Doa dan Harapan Terbaik Anda
                    </motion.span>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-4xl md:text-5xl font-serif text-gray-800"
                    >
                        Pesan dan Doa
                    </motion.h2>

                    {/* Decorative Divider */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-center gap-4 pt-4"
                    >
                        <div className="h-[1px] w-12 bg-rose-200" />
                        <MessageCircle className="w-5 h-5 text-rose-400" />
                        <div className="h-[1px] w-12 bg-rose-200" />
                    </motion.div>
                </motion.div>

                {/* Wishes List */}
                <div className="max-w-2xl mx-auto space-y-6">
                    {loading ? (
                        <div className="text-center py-8">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500 mx-auto"></div>
                            <p className="text-gray-500 mt-2">Memuat pesan...</p>
                        </div>
                    ) : wishes.length > 0 ? (
                        <AnimatePresence>
                            <Marquee speed={1}
                                gradient={undefined}
                                className="[--duration:350s] py-2">
                                {wishes.map((wish, index) => (
                                    <motion.div
                                        key={wish.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="group relative w-[280px]"
                                    >
                                        {/* Background gradient */}
                                        <div className="absolute inset-0 bg-gradient-to-r from-rose-100/50 to-pink-100/50 rounded-xl transform transition-transform group-hover:scale-[1.02] duration-300" />

                                        {/* Card content */}
                                        <div className="relative backdrop-blur-sm bg-white/80 p-4 rounded-xl border border-rose-100/50 shadow-md">
                                            {/* Header */}
                                            <div className="flex items-start space-x-3 mb-2">
                                                {/* Avatar */}
                                                <div className="flex-shrink-0">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 flex items-center justify-center text-white text-sm font-medium">
                                                        {wish.name[0].toUpperCase()}
                                                    </div>
                                                </div>

                                                {/* Name, Time, and Attendance */}
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center space-x-2">
                                                        <h4 className="font-medium text-gray-800 text-sm truncate">
                                                            {wish.name}
                                                        </h4>
                                                        {getAttendanceIcon(wish.attending)}
                                                    </div>
                                                    <div className="flex items-center space-x-1 text-gray-500 text-xs">
                                                        <Clock className="w-3 h-3" />
                                                        <time className="truncate">
                                                            {wish.timestamp ? formatEventDate(wish.timestamp) : 'Baru saja'}
                                                        </time>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Message */}
                                            <p className="text-gray-600 text-sm leading-relaxed mb-2 line-clamp-3">
                                                {wish.message}
                                            </p>

                                            {/* Optional: Time indicator for recent messages */}
                                            {wish.timestamp && Date.now() - new Date(wish.timestamp).getTime() < 3600000 && (
                                                <div className="absolute top-2 right-2">
                                                    <span className="px-2 py-1 rounded-full bg-rose-100 text-rose-600 text-xs font-medium">
                                                        New
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>
                                ))}
                            </Marquee>
                        </AnimatePresence>
                    ) : (
                        <div className="text-center py-8">
                            <MessageCircle className="w-12 h-12 text-gray-300 mx-auto mb-2" />
                            <p className="text-gray-500">Belum ada pesan. Jadilah yang pertama!</p>
                        </div>
                    )}
                </div>

                {/* Wishes Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="max-w-2xl mx-auto mt-12"
                >
                    <form onSubmit={handleSubmitWish} className="relative">
                        <div className="backdrop-blur-sm bg-white/80 p-6 rounded-2xl border border-rose-100/50 shadow-lg">
                            <div className='space-y-2'>
                                {/* Name Input */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <User className="w-4 h-4" />
                                        <span>Nama Kamu</span>
                                    </div>
                                    <input
                                        type="text"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        placeholder="Masukan nama kamu..."
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-gray-700 placeholder-gray-400"
                                        required
                                    />
                                </div>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 }}
                                    className="space-y-2 relative"
                                >
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <Calendar className="w-4 h-4" />
                                        <span>Apakah kamu hadir?</span>
                                    </div>

                                    {/* Custom Select Button */}
                                    <button
                                        type="button"
                                        onClick={() => setIsOpen(!isOpen)}
                                        className="w-full px-4 py-2.5 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 transition-all duration-200 text-left flex items-center justify-between"
                                    >
                                        <span className={attendance ? 'text-gray-700' : 'text-gray-400'}>
                                            {attendance ?
                                                options.find(opt => opt.value === attendance)?.label
                                                : 'Pilih kehadiran...'}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Dropdown Options */}
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="absolute z-10 w-full mt-1 bg-white rounded-xl shadow-lg border border-rose-100 overflow-hidden"
                                            >
                                                {options.map((option) => (
                                                    <motion.button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => {
                                                            setAttendance(option.value);
                                                            setIsOpen(false);
                                                        }}
                                                        whileHover={{ backgroundColor: 'rgb(255, 241, 242)' }}
                                                        className={`w-full px-4 py-2.5 text-left transition-colors
                                        ${attendance === option.value
                                                                ? 'bg-rose-50 text-rose-600'
                                                                : 'text-gray-700 hover:bg-rose-50'
                                                            }`}
                                                    >
                                                        {option.label}
                                                    </motion.button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                                {/* Wish Textarea */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2 text-gray-500 text-sm mb-1">
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Harapan kamu</span>
                                    </div>
                                    <textarea
                                        value={newWish}
                                        onChange={(e) => setNewWish(e.target.value)}
                                        placeholder="Kirimkan harapan dan doa untuk kedua mempelai..."
                                        className="w-full h-32 p-4 rounded-xl bg-white/50 border border-rose-100 focus:border-rose-300 focus:ring focus:ring-rose-200 focus:ring-opacity-50 resize-none transition-all duration-200"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-4">
                                <div className="flex items-center space-x-2 text-gray-500">
                                    <Smile className="w-5 h-5" />
                                    <span className="text-sm">Berikan Doa Anda</span>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={isSubmitting || !userName.trim() || !newWish.trim() || !attendance}
                                    className={`flex items-center space-x-2 px-6 py-2.5 rounded-xl text-white font-medium transition-all duration-200
                    ${isSubmitting || !userName.trim() || !newWish.trim() || !attendance
                                            ? 'bg-gray-300 cursor-not-allowed'
                                            : 'bg-rose-500 hover:bg-rose-600'}`}
                                >
                                    <Send className="w-4 h-4" />
                                    <span>{isSubmitting ? 'Sedang Mengirim...' : 'Kirimkan Doa'}</span>
                                </motion.button>
                            </div>
                        </div>
                    </form>
                </motion.div>
            </div>
        </section>
    </>)
}
