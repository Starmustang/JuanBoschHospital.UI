import axios from 'axios';
 import { toast } from 'react-toastify';

export const axiosMain = axios.create({
  baseURL: 'http://localhost:5028/api/',
  // headers: {  "Authorization" : `Bearer xxxxxxxx`
});
// if (process.env.REACT_APP_ENV === 'local') {
//   // Intercept requests in development to load JSON files
//   axiosSitodep.interceptors.request.use(async (config) => {
//     debugger;
//     const { url } = config; //ssss
//     if (url?.includes('/customer')) {
//       const clientText = new URLSearchParams(url.split('?')[1]).get('customerName');
//       const jsonData = await import('../../__mock__/client.json');

//       // Find the relevant data in the JSON (example logic)
//       const filteredData = jsonData.default.filter((client) => client.name.includes(clientText!));

//       // Mock the response to match the production structure
//       config.adapter = () => {
//         return Promise.resolve({
//           data: filteredData,
//           status: 200,
//           statusText: 'OK',
//           headers: {},
//           config,
//           request: {},
//         });
//       };
//     }

//     return config;
//   });
// }

// axiosSitodep.interceptors.request.use((config) => {
    
//     const includeToken = config.headers?.includeToken ?? true;
//     if (includeToken) {
//       const token = Cookies.get('access_token');
//       if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//       }
//     }
//     delete config.headers.includeToken;

//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// Add a response interceptor
axiosMain.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx will cause this function to trigger
    // Do something with successful response data
    return response;
  },
  function (error) {
    const statusCode = error.response ? error.response.status : null;
    if (statusCode && statusCode >= 500 && statusCode < 600) {
      // Show message for Internal Server Error
      toast.error(`Error de servidor, intentado otra vez`);
    } else if (statusCode) {
      switch (statusCode) {
        case 400:
          // Show message for Bad Request
          toast.error(`Peticion Erronea: ${error.response.data.message}`);
          break;
        case 401:
          // Show message for Unauthorized
          toast.error(`No autorizado: ${error.response.data.message}`);
          break;
        case 404:
          // Show message for Not Found
          toast.error(`No encontrado: ${error.response.data.message}`);
          break;
        // Add more cases as needed
        default:
          // Show a generic error message for other status codes
          toast.error(`Error: ${error.response.data.message}`);
      }
    }
    // Any status codes that falls outside the range of 2xx will cause this function to trigger
    // Do something with response error

    return Promise.reject(error);
  },
);

export default axiosMain;
