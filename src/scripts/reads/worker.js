// Reads: runs the three.js stage off the main thread, drawing to the OffscreenCanvas the page hands over.
import { createRenderer } from './gl.js';

var renderer = createRenderer(function (msg) { postMessage(msg); });
onmessage = function (e) { renderer.handle(e.data); };
