const path = require('path');

console.log('Directore name:', path.dirname(__filename));
console.log('File name:', path.basename(__filename));

console.log('file extension', path.extname(__filename));

const joinPath = path.join('/user', 'documents', 'node', 'projects');
console.log("Joined path", joinPath);

const resolvePath = path.resolve('user', 'documents', 'node', 'projects');
console.log("Resolve path", resolvePath);

const normalizePath = path.normalize('/user/.documents/../node/projects');
console.log("normalize path",normalizePath);