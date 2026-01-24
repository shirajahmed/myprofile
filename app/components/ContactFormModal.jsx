"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RxCross1 } from 'react-icons/rx';

export default function ContactFormModal({ show, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState(''); // 'loading', 'success', 'error'

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setStatus('error');
      alert('Please fill in all fields.');
      return;
    }

    try {
      await onSubmit(formData); // Call the onSubmit prop passed from parent
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' }); // Clear form
      setTimeout(() => onClose(), 2000); // Close after success message
    } catch (error) {
      console.error('Submission error:', error);
      setStatus('error');
    }
  };

  if (!show) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 backdrop-blur-sm"
        >
          <motion.div
            initial={{ y: "-100vh", opacity: 0 }}
            animate={{ y: "0", opacity: 1 }}
            exit={{ y: "100vh", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="relative w-full max-w-md mx-auto p-6 bg-white dark:bg-[#18191d] rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 dark:text-gray-400 hover:text-[#a65fa8] transition-colors"
              title="Close"
            >
              <RxCross1 size={20} />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Build Something <span className="text-[#a65fa8]">Crazy!</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#a65fa8] focus:border-[#a65fa8] text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#a65fa8] focus:border-[#a65fa8] text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#a65fa8] focus:border-[#a65fa8] text-gray-900 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="mt-1 block w-full px-3 py-2 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-[#a65fa8] focus:border-[#a65fa8] text-gray-900 dark:text-white"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#a65fa8] to-purple-600 hover:from-purple-600 hover:to-[#a65fa8] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#a65fa8] transition-colors"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Sending...' : 'Send Message'}
              </button>
            </form>

            {status === 'success' && (
              <p className="mt-4 text-center text-green-500 font-medium">Message Sent Successfully! 🎉</p>
            )}
            {status === 'error' && (
              <p className="mt-4 text-center text-red-500 font-medium">Failed to send message. Please try again.</p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
