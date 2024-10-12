# Project: Ecom Data Collection

## Overview

This project is designed to interact with the online shopping platform using various tools and libraries. It includes functionalities for web scraping, API interaction, and proxy management.

## Features

- **Web Scraping**: Uses Puppeteer to automate browser actions and extract data from web pages.
- **API Interaction**: Interacts with APIs to fetch data and perform operations.
- **Proxy Management**: Supports HTTP and HTTPS proxy configurations for secure and anonymous requests.
- **Environment Configuration**: Utilizes environment variables for sensitive data management.

## Prerequisites

- Node.js
- npm
- Environment variables configured in a `.env` file

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/razorcell/ecom-data-italy
   ```

2. Navigate to the project directory:
   ```bash
   cd protection
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add your environment variables:
   ```
   PROXY_URL=http://<username>:<password>@<host>:<port>
   ```

## Usage

### Running the Puppeteer Script

The script `changeStoreUsingPuppeteer.js` automates the process of changing stores on the Conad platform.

To run the script:
    ```
    node changeStoreUsingPuppeteer.js
    ```

### Testing Proxy

The script `testproxy.js` tests the proxy configuration by fetching your public IP address.

To run the script:
    ```
    node testproxy.js
    ```

## Dependencies

- `puppeteer-extra`
- `puppeteer-extra-plugin-stealth`
- `https-proxy-agent`
- `random-useragent`
- `dotenv`
- `node-fetch`

## License

This project is licensed under the ISC License. See the [LICENSE](LICENSE) file for more details.

## Author

- Khalifa

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Contact

For any inquiries, please contact [khalifa.rmili@gmail.com].