declare const client: {
    get(url: string): Promise<{}>;
    post(url: string, body?: {}): Promise<{}>;
};
export default client;
