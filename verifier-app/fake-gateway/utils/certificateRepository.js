import Dexie from 'dexie';

const db = new Dexie('DECERTDB');
db.version(1).stores({
    files: 'id'
});

async function createFile(file) {
    db.files.add(file);
}

async function getFile(id) {
    let file = await db.files.get(1);
    return file; 
}
