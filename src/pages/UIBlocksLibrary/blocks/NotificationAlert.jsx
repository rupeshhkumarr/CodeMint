// src/pages/UIBlocksLibrary/blocks/NotificationAlert.jsx
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const NotificationAlert = ({ refreshCount = 0 }) => {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const generateRandomNotification = () => {
    const types = ["success", "error", "warning", "info"];
    const messages = {
      success: [
        "Payment processed successfully",
        "Account created successfully",
        "File uploaded successfully",
        "Update completed successfully",
      ],
      error: [
        "Upload failed - please try again",
        "Payment declined - check your details",
        "Connection timeout - retrying",
        "Operation failed - insufficient permissions",
      ],
      warning: [
        "Storage almost full",
        "Unusual login activity detected",
        "Subscription expiring soon",
        "High memory usage detected",
      ],
      info: [
        "New feature available",
        "System maintenance scheduled",
        "Your profile has been updated",
        "New message received",
      ],
    };

    const amounts = ["$29.99", "$49.00", "$99.00", "$199.00"];
    const percentages = ["75%", "85%", "90%", "95%"];
    const times = [
      "2 minutes ago",
      "5 minutes ago",
      "1 hour ago",
      "2 hours ago",
    ];
    const icons = { success: "✅", error: "❌", warning: "⚠️", info: "ℹ️" };

    const type = types[Math.floor(Math.random() * types.length)];
    let message =
      messages[type][Math.floor(Math.random() * messages[type].length)];

    // Add dynamic values
    if (type === "success") {
      message = message.replace(
        "$amount",
        amounts[Math.floor(Math.random() * amounts.length)]
      );
    } else if (type === "warning" && message.includes("full")) {
      message = message.replace(
        "percentage",
        percentages[Math.floor(Math.random() * percentages.length)]
      );
    }

    return {
      type,
      title: message.split(" - ")[0],
      message: message,
      time: times[Math.floor(Math.random() * times.length)],
      icon: icons[type],
      id: Math.random().toString(36).substr(2, 9),
    };
  };

  useEffect(() => {
    const newNotifications = Array.from(
      { length: Math.floor(Math.random() * 3) + 2 },
      () => generateRandomNotification()
    );
    setNotifications(newNotifications);
    setUnreadCount(newNotifications.length);
  }, [refreshCount]);

  const getTypeStyles = (type) => {
    const styles = {
      success:
        "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20",
      error: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20",
      warning:
        "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/20",
      info: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20",
    };
    return styles[type] || styles.info;
  };

  const getTextStyles = (type) => {
    const styles = {
      success: "text-green-800 dark:text-green-300",
      error: "text-red-800 dark:text-red-300",
      warning: "text-yellow-800 dark:text-yellow-300",
      info: "text-blue-800 dark:text-blue-300",
    };
    return styles[type] || styles.info;
  };

  const handleMarkAllRead = () => {
    setUnreadCount(0);
    toast.success("All notifications marked as read!");
  };

  const handleViewAll = () => {
    const totalNotifications = Math.floor(Math.random() * 20) + 5;
    toast(`You have ${totalNotifications} total notifications in your inbox.`);
  };

  const handleNotificationClick = (notification) => {
    toast(`Notification: ${notification.title}\n${notification.message}`);
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-gray-200 dark:border-slate-700 p-4 sm:p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Notifications
        </h3>
        <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm px-2 py-1 rounded-full">
          {unreadCount} new
        </span>
      </div>

      <div className="space-y-3 sm:space-y-4 max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            onClick={() => handleNotificationClick(notification)}
            className={`p-3 sm:p-4 rounded-xl border cursor-pointer transform hover:bg-slate-900/20 transition-all duration-200 ${getTypeStyles(
              notification.type
            )}`}
          >
            <div className="flex items-start space-x-3">
              <span className="text-lg flex-shrink-0">{notification.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h4
                    className={`font-semibold text-sm sm:text-base ${getTextStyles(
                      notification.type
                    )}`}
                  >
                    {notification.title}
                  </h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400 flex-shrink-0 ml-2">
                    {notification.time}
                  </span>
                </div>
                <p
                  className={`text-xs sm:text-sm mt-1 ${getTextStyles(
                    notification.type
                  )}`}
                >
                  {notification.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
        <button
          onClick={handleMarkAllRead}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105"
        >
          Mark all as read
        </button>
        <button
          onClick={handleViewAll}
          className="flex-1 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 py-2.5 rounded-lg font-medium transition-colors duration-200 transform hover:scale-105"
        >
          View all
        </button>
      </div>
    </div>
  );
};

export default NotificationAlert;
