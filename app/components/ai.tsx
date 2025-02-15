'use client';

import { useConversation } from '@11labs/react';
import { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function Hotel_AI() {
	const conversation = useConversation({
		onConnect: () => console.log('Connected'),
		onDisconnect: () => console.log('Disconnected'),
		onMessage: (message: any) => console.log('Message:', message),
		onError: (error: any) => console.error('Error:', error),
	});

	const [language, setLanguage] = useState('en');
	const [isDropdownOpen, setDropdownOpen] = useState(false);

	const hotelData = {
		ai_agent_name: 'Gaurav',
		hotel_name: 'Hotel Oriental',
		hotel_id: '5297cae2-0179-46d6-9bc6-a68601f89cep',
	};
	const startConversation = useCallback(async () => {
		try {
			// Request microphone permission
			const stream = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});
			if (!stream) throw new Error('Microphone access denied');

			// Start the conversation
			const conversationId = await conversation.startSession({
				// url: signedUrl,
				// agentId: 'PY1W7plALWCvIzbdsnGJ',
				overrides: {
					agent: {
						language: language,
					},
				},
				agentId: 'jQE6o8JEJjeYeRJuxFSB',
				dynamicVariables: hotelData,
			});

			console.log('Conversation started with ID:', conversationId);
		} catch (error) {
			console.error('Failed to start conversation:', error);
		}
	}, [conversation, language]);

	const stopConversation = useCallback(async () => {
		await conversation.endSession();
	}, [conversation]);

	return (
		<AnimatePresence>
			<motion.div
				initial={{ opacity: 0, y: 50 }}
				animate={{ opacity: 1, y: 0 }}
				exit={{ opacity: 0, y: 50 }}
				transition={{ duration: 0.4, ease: 'easeOut' }}
				className='fixed bottom-4 right-4 bg-white shadow-xl rounded-2xl p-4 w-72 border border-gray-200'>
				<div className='flex justify-between items-center'>
					<h3 className='text-lg font-semibold text-gray-800 flex items-center'>
						AI Assistant
						<span
							className='ml-2 w-2.5 h-2.5 rounded-full animate-pulse'
							style={{
								backgroundColor: conversation.isSpeaking
									? 'green'
									: 'gray',
							}}></span>
					</h3>

					{/* Small Language Selector - Positioned in the Red Circle */}
					<div className='relative'>
						<button
							onClick={() => setDropdownOpen(!isDropdownOpen)}
							className='w-20 px-2 py-1 bg-gray-100 text-gray-700 rounded-md shadow-sm flex justify-between items-center hover:bg-gray-200 transition-all text-sm'>
							{language === 'en' ? 'English' : 'Hindi'}
							<motion.span
								animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
								▼
							</motion.span>
						</button>

						<AnimatePresence>
							{isDropdownOpen && (
								<motion.ul
									initial={{ opacity: 0, y: -10 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, y: -10 }}
									transition={{ duration: 0.2 }}
									className='absolute right-0 mt-1 w-20 bg-white border rounded-md shadow-md text-sm'>
									<li
										onClick={() => {
											setLanguage('en');
											setDropdownOpen(false);
										}}
										className='px-2 py-1 hover:bg-gray-200 cursor-pointer transition-all'>
										English
									</li>
									<li
										onClick={() => {
											setLanguage('hi');
											setDropdownOpen(false);
										}}
										className='px-2 py-1 hover:bg-gray-200 cursor-pointer transition-all'>
										Hindi
									</li>
								</motion.ul>
							)}
						</AnimatePresence>
					</div>
				</div>

				<p className='text-sm text-gray-600'>
					Status: {conversation.status}
				</p>
				<p className='text-sm text-gray-600'>
					Agent is{' '}
					{conversation.isSpeaking ? 'speaking' : 'listening'}
				</p>

				<div className='mt-3 flex gap-2'>
					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={startConversation}
						disabled={conversation.status === 'connected'}
						className='w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 transition-all'>
						Start Call
					</motion.button>

					<motion.button
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
						onClick={stopConversation}
						disabled={conversation.status !== 'connected'}
						className='w-full px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 disabled:bg-gray-300 transition-all'>
						End Call
					</motion.button>
				</div>
			</motion.div>
		</AnimatePresence>
	);
}
