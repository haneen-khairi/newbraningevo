import * as signalR from '@microsoft/signalr';
import Cookies from 'js-cookie';
import { BASE_URL } from '../api/instance';

let establishedConnection = null
const createSignalRConnection = (hubUrl = BASE_URL + "gateway/notification") => {
    if (establishedConnection) {
        return establishedConnection
    }
    const connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl + "?access_token=" + Cookies.get('token'), {
            skipNegotiation: true,
            transport: signalR.HttpTransportType.WebSockets
        })
        .configureLogging(signalR.LogLevel.Information)
        .build();
    establishedConnection = connection
    return connection;
};

export default createSignalRConnection;