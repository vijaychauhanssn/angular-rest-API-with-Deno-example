import { Router } from 'https://deno.land/x/oak/mod.ts';
import { getAllStudents, getStudentById, updateStudent, addStudent, deleteStudent } from './apis/studentApis.ts';

const router = new Router();

router.get('/students', getAllStudents)
    .get('/students/:id', getStudentById)
    .put('/students/:id', updateStudent)
    .post('/students', addStudent)
    .delete('/students/:id', deleteStudent);

export default router;
