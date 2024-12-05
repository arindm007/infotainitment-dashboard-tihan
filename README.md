
# T-SIRUS: Infotainment Dashboard

T-SIRUS is a cutting-edge software-defined vehicle dashboard built with React, offering a seamless and intelligent infotainment experience. It provides a robust suite of features, including navigation, scheduling, real-time vehicle insights, entertainment, video calling, and extensive customizability.

---

## 🚀 **Features**

- **Navigation**: Intuitive maps powered by Azure Map Services for seamless route planning.
- **Scheduling**: Calendar integration with Syncfusion for efficient event and meeting management.
- **Vehicle Insights**: Real-time speedometer and battery percentage display.
- **Entertainment**: Integrated music player for an enhanced in-car experience.
- **Video Calling**: High-quality video calls and screen-sharing using ZEGOCLOUD.
- **Customizability**: User-defined settings and a store to add new services.

---

## 📂 **Folder Structure**

```
src/
├── components/
│   ├── AuthPage.js
│   ├── Calendar/
│   │   ├── Calendar.js
│   │   ├── CalendarCustom.css
│   │   └── CalendarScheduler.js
│   ├── CarDetails/
│   │   ├── CarDetails.js
│   │   ├── CarDetails_stl.js
│   │   ├── Speedometer.css
│   │   └── Speedometer.js
│   ├── Map.js
│   ├── MusicPlayer/
│   │   ├── MusicApp.js
│   │   └── MusicApp.css
│   ├── Notification/
│   │   ├── Notification.js
│   │   └── Notification.css
│   ├── Settings/
│   │   ├── Settings.js
│   │   └── Settings.css
│   ├── Sidebar.js
│   ├── Store/
│   │   ├── Categories.js
│   │   ├── Categories.css
│   │   ├── Store.js
│   │   └── Store.css
│   └── VideoCall/
│       ├── VideoCall.js
│       └── zegoServerAssistant.js
├── App.js
├── index.js
└── ...
```

---

## 🛠 **Core Technologies**

- **React.js**: Frontend framework for a dynamic and responsive UI.
- **Azure Maps**: Maps integration for navigation and location services.
- **Syncfusion**: Calendar and scheduler for event management.
- **ZEGOCLOUD**: Video calling and screen-sharing capabilities.
- **TailwindCSS** & **Material-UI**: Modern and scalable styling frameworks.
- **React-Icons**: Comprehensive icon library.

---

## 📝 **Getting Started**

### Prerequisites
Ensure the following are installed:
- **Node.js**: Version 14 or higher.
- **npm**: Node package manager.

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/arindm007/infotainitment-dashboard-tihan.git
   ```

2. Navigate to the project directory:
   ```bash
   cd infotainitment-dashboard-tihan
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## 📚 **Component Documentation**

### **Sidebar**
- **Purpose**: Provides navigation between different sections of the dashboard.
- **Key Features**:
  - Menu options for Maps, Calendar, Calls, Store, and Settings.
  - React-Icons integration for an intuitive user interface.
- **Code Example**:
  ```jsx
  const routes = [
    { path: '/', icon: <FaHome /> },
    { path: '/calendar', icon: <FaCalendarAlt /> },
    { path: '/call', icon: <SiGooglemeet /> },
    { path: '/store', icon: <FaAppStore /> },
    { path: '/car', icon: <FaCar /> },
    { path: '/settings', icon: <FaCog /> },
  ];
  ```

### **Map**
- **Purpose**: Displays maps and navigation using Azure Map Services.
- **Integration**: Utilizes Azure REST APIs to fetch and render map data.

---

## 🤝 **Contributing**

Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a feature branch: 
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Submit a pull request.

---

## 📜 **License**

This project is licensed under the [MIT License](LICENSE).

---

## 💡 **Future Enhancements**
- Integration with additional entertainment services.
- Enhanced AI-driven recommendations for navigation and scheduling.
- Support for voice commands and gesture controls.

Feel free to reach out with suggestions or issues!
