# Rick and Morty API Web Application

This project is a React-based web application that fetches and displays data from the [Rick and Morty API](https://rickandmortyapi.com/). Users can view, filter, and paginate through characters from the popular TV show **Rick and Morty**.

---

## Features

- 🧑‍🎤 **Character List**: Displays all Rick and Morty characters with their names, statuses, and species.
- 🔍 **Search Filter**: Allows users to filter characters by name, status, or species.
- 📄 **Pagination**: Paginated character list for easy browsing.
- ⚡ **Fast API Integration**: Fetches data from the Rick and Morty API using Axios.
- 🎨 **Responsive Design**: Works seamlessly across devices.

---

## Demo

You can view the live demo of the project [here](https://rick-and-morty-api-7unm.vercel.app/).

---

## Installation

Follow these steps to run the project on your local machine:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/nazifebutun/Rick-and-Morty-Api.git
   cd Rick-and-Morty-Api
2. **Clone the repository**:
   ```bash
   npm install

3. **Clone the repository**:
   ```bash
   npm start
The application will be available at http://localhost:3000.

## **Usage**

### **1. View Characters**
All characters are displayed on the main page, with their name, status, and species.

### **2. Search Filter**
Use the search bar to filter characters by name, status, or species.

### **3. Pagination**
Navigate between pages using the pagination controls at the bottom of the page.

---

## Deployment
The project is deployed to GitHub Pages. To deploy any updates, follow these steps:

### Build the project:
```bash
npm run build
```

### Deploy to GitHub Pages:
```bash
npm run deploy
```

## Project Structure
```
Rick-and-Morty-Api/
├── public/
│   ├── index.html        # Main HTML file
├── src/
│   ├── components/       # Reusable components
│   ├── App.js            # Main App component
│   ├── index.js          # Entry point
│   ├── styles/           # CSS styles
│   └── ...
├── package.json          # Project metadata and dependencies
├── README.md             # Documentation
└── ...
```

## Technologies Used
- **React**: Front-end framework
- **Axios**: For making API requests
- **CSS**: Styling
- **GitHub Pages**: Deployment

## Rick and Morty API
This project uses the Rick and Morty API for fetching data about the characters.

### API Endpoint Used
- **Characters**: [https://rickandmortyapi.com/api/character](https://rickandmortyapi.com/api/character)

## Troubleshooting

### Common Issues

1. **Axios not found**: Make sure axios is installed:
   ```bash
   npm install axios
   ```

2. **Page not loading on GitHub Pages**: Ensure the `homepage` field in `package.json` is correctly set:
   ```json
   "homepage": "https://<your-username>.github.io/Rick-and-Morty-Api"
   ```

3. **Missing scripts error**: Ensure the `scripts` section in `package.json` includes:
   ```json
   "scripts": {
     "start": "react-scripts start",
     "build": "react-scripts build",
     "deploy": "gh-pages -d build"
   }
   ```

## Contributing
If you'd like to contribute to the project:

1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your message here"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a pull request.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgements
- Thanks to the creators of the Rick and Morty API for providing such a great API.
- Inspired by the amazing Rick and Morty series!

## Contact
If you have any questions or suggestions, feel free to reach out!

- **Email**: nazife@example.com
- **GitHub**: [nazifebutun](https://github.com/nazifebutun)




