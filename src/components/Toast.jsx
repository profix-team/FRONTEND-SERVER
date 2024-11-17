import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext.jsx';

const Toast = () => {
    const { toast } = useAuth();

    return (
        <div className="fixed inset-0 pointer-events-none flex items-start justify-center" style={{ zIndex: 9999 }}>
            <AnimatePresence>
                {toast.show && (
                    <motion.div
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{
                            duration: 0.3,
                            ease: 'easeOut',
                        }}
                        className={`${toast.type === 'error' ? 'bg-red-500' : 'bg-[#75E593]'} mt-8 px-8 py-4 rounded-lg shadow-xl text-white min-w-[400px] pointer-events-auto`}
                    >
                        <div className="text-center">
                            <span className="text-lg whitespace-nowrap">{toast.message}</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Toast;
