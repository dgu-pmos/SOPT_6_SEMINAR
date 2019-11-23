const pool = require('../module/pool');
const table = 'article';

module.exports = {
    create: async (json) => {
        const fields = 'blogIdx, title, content';
        const questions = `"${json.blogIdx}","${json.title}","${json.content}"`;
        const result = await pool.queryParam_None(`INSERT INTO ${table}(${fields})VALUES(${questions})`)
        return result;
    },
    read: async (json) => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE articleIdx = ${json.articleIdx} AND blogIdx = ${json.blogIdx}`)
        return result;
    },
    readAll: async (json) => {
        const result = await pool.queryParam_None(`SELECT * FROM ${table} WHERE blogIdx = ${json.blogIdx}`)
        return result;
    },
    update: async (json) => {
        const result = await pool.queryParam_None(`UPDATE ${table} SET content = '${json.content}', title = '${json.title}' where blogIdx = '${json.blogIdx}' AND articleIdx = '${json.articleIdx}'`)
        return result;
    },
    remove: async (json) => {
        const result = await pool.queryParam_None(`DELETE FROM ${table} WHERE blogIdx='${json.blogIdx}' AND articleIdx='${json.articleIdx}'`)
        return result;
    }
}
