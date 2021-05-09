import { StudentData, Student } from './../model/student.ts';

export const getAllStudents = ({ response }: { response: any }) => {
    response.body = StudentData;
};

export const getStudentById = ({ params, response }: { params: { id: string }; response: any }) => {
    const selectedStudent: Student | undefined = StudentData.find((student) =>
        student.id === +params.id
    );
    if (selectedStudent) {
        response.status = 200;
        response.body = selectedStudent;
    }
    else {
        response.status = 404;
        response.body = [];
    }
};

export const addStudent = async (
    { request, response }: { request: any; response: any },
) => {
    if (!request.hasBody) {
        response.status = 400;
    } else {
        const payload = await request.body();
        const newStudent: Student = payload.value;

        newStudent.id = getNextStudentId();
        StudentData.push(newStudent);
        response.status = 201;
    }
};

function getNextStudentId(): number {
    let maxId = 1;
    StudentData.forEach(p => {
        maxId = Math.max(p.id, maxId);
    });
    return maxId + 1;
}

export const deleteStudent = (
    { params, response }: { params: { id: string }; response: any },
) => {
    const targetId = +params.id;
    const newStudentList = StudentData.filter(x => x.id !== targetId);
    if (newStudentList.length < StudentData.length) {
        replaceCollection(StudentData, newStudentList);
        response.status = 200;
    } else {
        response.status = 404;
    }
};

export const updateStudent = async (
    { params, request, response }: {
        params: { id: string };
        request: any;
        response: any;
    },
) => {
    const targetId = +params.id;
    const studentToUpdate: Student | undefined = StudentData.find((student) =>
        student.id === targetId
    );
    if (studentToUpdate) {
        const body = await request.body();
        const newStudentData: Student = body.value;

        const updatedData = StudentData.map((e: Student) => {
            return e.id === targetId ? { ...e, ...newStudentData } : e;
        });

        replaceCollection(StudentData, updatedData);
        response.status = 200;
    } else {
        response.status = 404;
    }
};

function replaceCollection(originalData: Student[], newData: Student[]) {
    originalData.splice(0, originalData.length);
    originalData.push(...newData);
}
