import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const Toast = ({ toast = { show: false, message: '', type: 'success' } }) => {
    if (!toast) return null;

    return (
        <AnimatePresence>
            {toast.show && (
                <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} className={`fixed bottom-4 right-4 px-6 py-3 rounded-lg shadow-lg ${toast.type === 'error' ? 'bg-red-500' : 'bg-[#75E593]'} text-white z-50`}>
                    {toast.message}
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Toast;
