import { io } from 'socket.io-client';
import {BASE_URL} from "../api/util";

export const socket = io(BASE_URL);