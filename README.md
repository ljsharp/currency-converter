# Currency Converter

A simple currency converter application with a backend using Node.js and MySQL, and a frontend using Vue 3 with the Composition API and Tailwind CSS.

## Backend Setup

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/ljsharp/currency-converter.git
    cd currency-converter
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a MySQL database:
   To create a MySQL database, use XAMPP or any other software that supports MySQL. Create a new database named currency_converter.

4. Update the MySQL connection details in `server.js`:
    ```js
    const db = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'currency_converter'
    });
    ```

5. Start the backend server:
    ```sh
    node server.js
    ```

The backend server should now be running at `http://localhost:3000`.

### Endpoints

- `GET /update-rates`: Fetch and update exchange rates from an external API.
- `GET /convert`: Convert currency using the parameters `from`, `to`, and `amount`.

## Frontend Setup

### Installation

1. Navigate to the frontend directory:
    ```sh
    cd frontend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Run the frontend server:
    ```sh
    npm run dev
    ```

The frontend server should now be running at `http://localhost:5173` and replace it if port is different.

### Project Structure

- `src/components/CurrencyConverter.vue`: The currency converter component.
- `src/components/UpdateRates.vue`: The component to update exchange rates.
- `src/main.js`: The main entry point, which sets up Vue Router and mounts the app.

### Usage

Navigate to the following routes:

- `/`: Currency Converter
- `/update-rates`: Update Exchange Rates

### Example

1. To update exchange rates, navigate to `http://localhost:8080/update-rates` and click the "Update Rates" button.
2. To convert currency, navigate to `http://localhost:8080/`, fill in the amount, select the currencies, and click the "Convert" button.

## License

This project is licensed under the MIT License.
