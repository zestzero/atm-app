class Url {
    static API_URL = process.env.REACT_APP_API_URL;
    static getPath = (path: string): string => `${Url.API_URL}/${path}`;
}

export default Url;
