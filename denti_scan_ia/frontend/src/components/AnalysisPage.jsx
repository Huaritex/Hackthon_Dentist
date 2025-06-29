import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Usar imágenes desde public/assets
const dentalScanResult = '/assets/dental-scan-result.jpg';
const iconCavity = '/assets/icon-cavity.png';
const iconHealthScore = '/assets/icon-health-score.png';

const ToothIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6" {...props} >
        <path d="M12.378 1.602a.75.75 0 00-.756 0L3.392 6.352a.75.75 0 00-.392.65v9.197c0 .282.157.533.392.65l8.23 4.748a.75.75 0 00.756 0l8.23-4.748a.75.75 0 00.392-.65V7a.75.75 0 00-.392-.65L12.378 1.602zM12 3.135l6.818 3.936-3.886 2.244-6.818-3.936L12 3.135zM4.5 7.636l3.886 2.244-3.886 2.244V7.636zm1.263 8.353l3.886-2.244 3.23 1.865a.75.75 0 00.756 0l3.23-1.865 3.886 2.244L12 20.865l-6.237-3.599zM19.5 12.124l-3.886-2.244 3.886-2.244v4.488z" />
    </svg>
);

const QuestionMarkIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" {...props} >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

const AnalysisPage = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: 0.2 }
        }
    };
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1, y: 0,
            transition: { type: 'spring', stiffness: 100, damping: 15 }
        }
    };
    return (
        <div className="relative min-h-screen w-full font-sans overflow-x-hidden">
            {/* Fondo visual propio para AnalysisPage */}
            <div className="fixed inset-0 z-0 bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#3A86FF]" style={{ minHeight: '100vh', minWidth: '100vw' }} />
            <div className="fixed inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-transparent to-transparent pointer-events-none" />
            <motion.div
                className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                {/* Header */}
                <motion.header variants={itemVariants} className="flex justify-between items-center border-b border-gray-800 pb-6 mb-12">
                    <Link to="/" className="flex items-center space-x-3">
                        <ToothIcon className="text-blue-500" />
                        <span className="text-2xl font-bold tracking-wider">Dental AI</span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-8 text-gray-300">
                        <Link to="/" className="hover:text-white transition-colors">Home</Link>
                        <Link to="/analysis" className="text-white font-semibold">Analysis</Link>
                        <Link to="/about" className="hover:text-white transition-colors">About</Link>
                    </nav>
                    <button className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors">
                        <QuestionMarkIcon />
                    </button>
                </motion.header>
                <main>
                    {/* Título Principal */}
                    <motion.h1 variants={itemVariants} className="text-4xl lg:text-5xl font-bold mb-10 text-gray-100">
                        Your DentiScan Analysis
                    </motion.h1>
                    {/* Sección de Imagen Principal */}
                    <motion.section variants={itemVariants} className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12 mb-20 p-8 bg-[#161B22] rounded-2xl">
                        <div className="flex-shrink-0 w-full lg:w-1/2">
                            <img src={dentalScanResult} alt="Dental scan result" className="rounded-2xl shadow-2xl shadow-black/30 w-full h-auto object-cover" />
                        </div>
                        <div className="flex-grow">
                            <h2 className="text-3xl font-bold text-white mb-3">Dental Image Analysis</h2>
                            <p className="text-gray-400 text-lg leading-relaxed mb-6">
                                Explore your dental health with interactive annotations and detailed insights.
                            </p>
                            <motion.button
                                className="px-6 py-3 bg-blue-600 rounded-lg text-white font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/20"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Interactive Details
                            </motion.button>
                        </div>
                    </motion.section>
                    {/* Key Findings */}
                    <motion.section variants={itemVariants} className="mb-20">
                        <h2 className="text-3xl font-bold mb-8 text-gray-100">Key Findings</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Card 1: Cavity Probability */}
                            <div className="bg-[#161B22] rounded-2xl p-6 flex justify-between items-center transition-transform hover:-translate-y-2">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Cavity Probability</h3>
                                    <p className="text-gray-400 mb-4">Low</p>
                                    <button className="px-4 py-2 bg-gray-700/50 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">
                                        View Details
                                    </button>
                                </div>
                                <div className="bg-teal-500/10 p-2 rounded-xl">
                                    <img src={iconCavity} alt="Cavity icon" className="w-24 h-24 object-contain" />
                                </div>
                            </div>
                            {/* Card 2: Overall Health Score */}
                            <div className="bg-[#161B22] rounded-2xl p-6 flex justify-between items-center transition-transform hover:-translate-y-2">
                                <div>
                                    <h3 className="text-xl font-bold text-white">Overall Dental Health Score</h3>
                                    <p className="text-gray-400 mb-4">4.5/5 Stars</p>
                                    <button className="px-4 py-2 bg-gray-700/50 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">
                                        View Details
                                    </button>
                                </div>
                                <div className="bg-blue-500/10 p-2 rounded-xl">
                                    <img src={iconHealthScore} alt="Health score icon" className="w-24 h-24 object-contain" />
                                </div>
                            </div>
                        </div>
                    </motion.section>
                    {/* Texto */}
                    <motion.section variants={itemVariants} className="space-y-10 mb-12 text-gray-300 leading-relaxed max-w-4xl">
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-white">AI Analysis</h3>
                            <p>Based on your uploaded dental image, the AI analysis indicates a low probability of cavities detected. The overall dental health score is rated as good, with no immediate concerns identified. However, for a comprehensive evaluation, consulting with a dental professional is recommended.</p>
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold mb-3 text-white">Recommendations</h3>
                            <p>While the AI analysis suggests a healthy dental state, a professional dental examination can provide a more detailed assessment. Regular check-ups are crucial for maintaining optimal dental health and early detection of any potential issues.</p>
                        </div>
                    </motion.section>
                    {/* Botón Final */}
                    <motion.div variants={itemVariants} className="text-center pt-8">
                        <motion.button
                            className="px-8 py-4 bg-blue-600 rounded-lg text-white font-bold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg shadow-blue-600/30"
                            whileHover={{ scale: 1.05, y: -2 }}
                            whileTap={{ scale: 0.98, y: 0 }}
                        >
                            Schedule a Consultation
                        </motion.button>
                    </motion.div>
                </main>
            </motion.div>
        </div>
    );
};

export default AnalysisPage;
