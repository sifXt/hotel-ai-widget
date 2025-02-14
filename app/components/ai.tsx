"use client";

import { useConversation } from "@11labs/react";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Hotel_AI() {
  const conversation = useConversation({
    onConnect: () => console.log("Connected"),
    onDisconnect: () => console.log("Disconnected"),
    onMessage: (message: any) => console.log("Message:", message),
    onError: (error: any) => console.error("Error:", error),
  });

  const [language, setLanguage] = useState("en");
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const hotelData = {
    ai_agent_name: "Gaurav",
    hotel_name: "Hotel Oriental",
    gst_number: "05AGCPG3129Q1ZC",
    hotel_id: "5297cae2-0179-46d6-9bc6-a68601f89cep",
    hotel_data: `{
			hotel: {
				location: 'Dehradun, Uttarakhand',
				total_rooms: 10,
				available_rooms: 4,
				occupied_rooms: 5
				reserved_rooms_today: 1,
				checking_out_today: 5,
				late_checkout_today: 3,
			},
			"rooms": [
				{
				"room_number": 101,
				"type": "Deluxe",
				"status": "occupied",
				"guest_ids": [1]
				},
				{
				"room_number": 102,
				"type": "Suite",
				"status": "occupied",
				"guest_ids": [2]
				},
				{
				"room_number": 103,
				"type": "Standard",
				"status": "available",
				"guest_ids": []
				},
				{
				"room_number": 104,
				"type": "Standard",
				"status": "occupied",
				"guest_ids": [3]
				},
				{
				"room_number": 105,
				"type": "Deluxe",
				"status": "available",
				"guest_ids": []
				},
				{
				"room_number": 106,
				"type": "Suite",
				"status": "occupied",
				"guest_ids": [4]
				},
				{
				"room_number": 107,
				"type": "Deluxe",
				"status": "reserved",
				"guest_ids": [5]
				},
				{
				"room_number": 108,
				"type": "Standard",
				"status": "available",
				"guest_ids": []
				},
				{
				"room_number": 109,
				"type": "Suite",
				"status": "occupied",
				"guest_ids": [6, 7]
				},
				{
				"room_number": 110,
				"type": "Standard",
				"status": "available",
				"guest_ids": []
				}
			],
			"guests": [
				{
				"guest_id": 1,
				"name": "Rajesh Sharma",
				"phone": "+91 9876543210",
				"checkin_date": "2025-02-13",
				"checkout_date": "2025-02-15",
				"room_number": 101
				},
				{
				"guest_id": 2,
				"name": "Priya Mehta",
				"phone": "+91 8765432109",
				"checkin_date": "2025-02-14",
				"checkout_date": "2025-02-16",
				"room_number": 102
				},
				{
				"guest_id": 3,
				"name": "Amitabh Rao",
				"phone": "+91 9543210987",
				"checkin_date": "2025-02-12",
				"checkout_date": "2025-02-14",
				"room_number": 104
				},
				{
				"guest_id": 4,
				"name": "Sneha Kapoor",
				"phone": "+91 9123456780",
				"checkin_date": "2025-02-13",
				"checkout_date": "2025-02-15",
				"room_number": 106
				},
				{
				"guest_id": 5,
				"name": "Vikram Desai",
				"phone": "+91 9988776655",
				"checkin_date": "2025-02-14",
				"checkout_date": "2025-02-16",
				"room_number": 107
				},
				{
				"guest_id": 6,
				"name": "Ananya Gupta",
				"phone": "+91 9090909090",
				"checkin_date": "2025-02-13",
				"checkout_date": "2025-02-15",
				"room_number": 109
				},
				{
				"guest_id": 7,
				"name": "Mayank Trivedi",
				"phone": "+91 9090909090",
				"checkin_date": "2025-02-13",
				"checkout_date": "2025-02-15",
				"room_number": 109
				}
			]
			orders: [
				{
					order_id: 1,
					guest_id: 1,
					room_number: 101,
					type: 'food',
					items: ['1 Paneer Butter Masala', '3 Naan'],
					status: 'in progress',
				},
				{
					order_id: 2,
					guest_id: 2,
					room_number: 102,
					type: 'room_service',
					items: ['Fresh Towels'],
					status: 'in progress',
				},
				{
					order_id: 3,
					guest_id: 6,
					room_number: 109,
					type: 'food',
					items: ['1 Idli Sambhar', '2 Tea'],
					status: 'pending',
				},
			],
			staff: [
				{
					staff_id: 1,
					name: 'Amit Verma',
					role: 'Receptionist',
				},
				{
					staff_id: 2,
					name: 'Sunita Yadav',
					role: 'Housekeeping',
					current_tasks: [
						'Clean room 103',
						'Deliver fresh towels to room 102',
					],
				},
				{
					staff_id: 3,
					name: 'Aman Kumar',
					role: 'Housekeeping',
					current_tasks: [],
				},
				{
					staff_id: 4,
					name: 'Ramesh Kumar',
					role: 'Chef',
					current_tasks: ['Prepare order 1'],
				},
			],
		}`,
  };
  const startConversation = useCallback(async () => {
    try {
      // Request microphone permission
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
      if (!stream) throw new Error("Microphone access denied");

      // Start the conversation
      const conversationId = await conversation.startSession({
        // url: signedUrl,
        // agentId: 'PY1W7plALWCvIzbdsnGJ',
        overrides: {
          agent: {
            language: language,
          },
        },
        // CCGZS02U6Rx08DsxIUk4
        agentId: "CCGZS02U6Rx08DsxIUk4",
        // agentId: "zTSEh4GHpyf2SsYrsPM9",
        dynamicVariables: hotelData,
      });

      console.log("Conversation started with ID:", conversationId);
    } catch (error) {
      console.error("Failed to start conversation:", error);
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
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-4 right-4 bg-white shadow-xl rounded-2xl p-4 w-72 border border-gray-200"
      >
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center">
            AI Assistant
            <span
              className="ml-2 w-2.5 h-2.5 rounded-full animate-pulse"
              style={{
                backgroundColor: conversation.isSpeaking ? "green" : "gray",
              }}
            ></span>
          </h3>

          {/* Small Language Selector - Positioned in the Red Circle */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!isDropdownOpen)}
              className="w-20 px-2 py-1 bg-gray-100 text-gray-700 rounded-md shadow-sm flex justify-between items-center hover:bg-gray-200 transition-all text-sm"
            >
              {language === "en" ? "English" : "Hindi"}
              <motion.span animate={{ rotate: isDropdownOpen ? 180 : 0 }}>
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
                  className="absolute right-0 mt-1 w-20 bg-white border rounded-md shadow-md text-sm"
                >
                  <li
                    onClick={() => {
                      setLanguage("en");
                      setDropdownOpen(false);
                    }}
                    className="px-2 py-1 hover:bg-gray-200 cursor-pointer transition-all"
                  >
                    English
                  </li>
                  <li
                    onClick={() => {
                      setLanguage("hi");
                      setDropdownOpen(false);
                    }}
                    className="px-2 py-1 hover:bg-gray-200 cursor-pointer transition-all"
                  >
                    Hindi
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>

        <p className="text-sm text-gray-600">Status: {conversation.status}</p>
        <p className="text-sm text-gray-600">
          Agent is {conversation.isSpeaking ? "speaking" : "listening"}
        </p>

        <div className="mt-3 flex gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startConversation}
            disabled={conversation.status === "connected"}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 disabled:bg-gray-300 transition-all"
          >
            Start Call
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={stopConversation}
            disabled={conversation.status !== "connected"}
            className="w-full px-4 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 disabled:bg-gray-300 transition-all"
          >
            End Call
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
