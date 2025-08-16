// src/pages/LandingPage.jsx
import config from '@/config/config';
import { formatEventDate } from '@/lib/formatEventDate';
import { motion } from 'framer-motion';
import { Calendar, Clock } from 'lucide-react';
import {useEffect, useState} from "react";

const LandingPage = ({ onOpenInvitation }) => {
      const [guestName, setGuestName] = useState('');

      useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const guestParam = urlParams.get('guest');

        if (guestParam) {
          try {
            // const decodedName = safeBase64.decode(guestParam);
            setGuestName(guestParam);
          } catch (error) {
            console.error('Error decoding guest name:', error);
            setGuestName('');
          }
        }
      }, []);

      return (
          <div>
            <motion.div
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                exit={{opacity: 0}}
                className="min-h-screen relative overflow-hidden"
            >
              {/* Decorative Background */}
              <div className="absolute inset-0 bg-gradient-to-b from-white via-rose-50/30 to-white"/>
              <div
                  className="absolute top-0 right-0 w-64 h-64 md:w-96 md:h-96 bg-rose-100/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"/>
              <div
                  className="absolute bottom-0 left-0 w-64 h-64 md:w-96 md:h-96 bg-pink-100/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"/>

              {/* Main Content */}
              <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
                <motion.div
                    initial={{y: 20, opacity: 0}}
                    animate={{y: 0, opacity: 1}}
                    transition={{duration: 0.8}}
                    className="w-full max-w-md"
                >
                  {/* Card Container */}
                  <div
                      className="backdrop-blur-sm bg-white/50 p-6 sm:p-8 md:p-10 rounded-2xl border border-rose-100/50 shadow-xl">
                    {/* Top Decorative Line */}
                    <div className="flex items-center justify-center gap-3 mb-6 sm:mb-8">
                      <div className="h-px w-12 sm:w-16 bg-rose-200/50"/>
                      <div className="w-2 h-2 rounded-full bg-rose-300"/>
                      <div className="h-px w-12 sm:w-16 bg-rose-200/50"/>
                    </div>

                    {/* Date and Time */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.3}}
                        className="flex flex-col gap-4 mb-6 sm:mb-8 items-center"
                    >
                    </motion.div>

                    {/* Couple Names */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.5}}
                        className="text-center space-y-4"
                    >
                      <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 leading-tight">
                          <p>{config.data.groomName}</p>
                        </h1>
                        <h3>{config.data.parentGroom}</h3>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 leading-tight">
                          <span className="text-rose-400 mx-2 sm:mx-3">&</span> <br/>
                        </h1>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif text-gray-800 leading-tight">
                          <p>{config.data.brideName}</p>
                        </h1>
                        <h3>{config.data.parentBride}</h3>


                        <div className="h-px w-16 sm:w-24 mx-auto bg-rose-200"/>
                        <p></p>
                        <p></p>

                        {/* Couple Photos */}
                        <motion.div
                            initial={{opacity: 0, y: 20}}
                            animate={{opacity: 1, y: 0}}
                            transition={{delay: 0.7}}
                            className="flex justify-center gap-4 sm:gap-6 mt-6"
                        >
                          {/* Groom Photo */}
                          <motion.div
                              whileHover={{scale: 1.05}}
                              className="relative"
                          >
                            <img
                                src="/images/wedding.jpeg"
                                alt={config.data.groomName}
                                className="img-thumbnail rounded-circle"
                                style={{
                                  width: '330px',
                                  height: '180px',
                                  objectFit: 'cover'
                                }}
                            />
                            {/*<div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">*/}
                            {/*  <div className="bg-white px-2 py-1 rounded-full shadow-sm border border-rose-100">*/}
                            {/*    <span className="text-xs text-gray-600 font-medium">Groom</span>*/}
                            {/*  </div>*/}
                            {/*</div>*/}
                          </motion.div>

                          {/* Heart Icon */}
                          <motion.div
                              animate={{scale: [1, 1.1, 1]}}
                              transition={{repeat: Infinity, duration: 2}}
                              className="flex items-center justify-center"
                          >
                            {/*<div className="w-8 h-8 sm:w-10 sm:h-10 bg-rose-100 rounded-full flex items-center justify-center">*/}
                            {/*  <span className="text-rose-500 text-lg sm:text-xl">💕</span>*/}
                            {/*</div>*/}
                          </motion.div>

                          {/* Bride Photo */}
                          {/*<motion.div*/}
                          {/*    whileHover={{scale: 1.05}}*/}
                          {/*    className="relative"*/}
                          {/*>*/}
                          {/*  <img*/}
                          {/*      src="/images/istri.jpeg"*/}
                          {/*      alt={config.data.brideName}*/}
                          {/*      className="img-thumbnail"*/}
                          {/*      style={{*/}
                          {/*        width: '100px',*/}
                          {/*        height: '120px',*/}
                          {/*        objectFit: 'cover'*/}
                          {/*      }}*/}
                          {/*  />*/}

                          {/*</motion.div>*/}

                        </motion.div>


                        <motion.div
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            transition={{delay: 1.1}}
                            className="space pt-3"
                        >
                          <p className="text-gray-500 font-serif italic text-sm">
                            Kepada Yth.
                          </p>
                          <p className="text-gray-600 font-medium text-sm">
                            Bapak/Ibu/Saudara/i
                          </p>
                          <p className="text-rose-500 font-semibold text-lg">
                            {guestName ? guestName : "Tamu"}
                          </p>
                        </motion.div>
                      </div>
                    </motion.div>

                    {/* Open Invitation Button */}
                    <motion.div
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        transition={{delay: 0.7}}
                        className="mt-6 sm:mt-8"
                    >
                      <motion.button
                          whileHover={{scale: 1.02}}
                          whileTap={{scale: 0.98}}
                          onClick={onOpenInvitation}
                          className="group relative w-full bg-rose-500 text-white px-6 py-3 sm:px-8 sm:py-3 rounded-xl font-medium shadow-lg hover:bg-rose-600 transition-all duration-200"
                      >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>Buka Undangan</span>
                        <motion.span
                            animate={{x: [0, 4, 0]}}
                            transition={{repeat: Infinity, duration: 1.5}}
                        >
                          →
                        </motion.span>
                        </span>
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-rose-600 to-rose-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"/>
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
      )

    };

export default LandingPage;
