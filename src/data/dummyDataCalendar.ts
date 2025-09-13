import { addDays, setHours, setMinutes } from 'date-fns'

const createDateTime = (
    daysFromNow: number,
    hour: number,
    minute: number = 0
) => {
    const date = addDays(new Date(), daysFromNow)
    return setMinutes(setHours(date, hour), minute)
}

export const dummyEvents = [
    {
        id: 1,
        title: 'Juan Pérez - Dr. García',
        start: createDateTime(0, 9, 0),
        end: createDateTime(0, 9, 30),
        resource: {
            medicoId: 'doc-1',
            pacienteId: 'pac-1',
            medico: 'Dr. García',
            paciente: 'Juan Pérez',
        },
    },
    {
        id: 2,
        title: 'María López - Dr. García',
        start: createDateTime(0, 10, 30),
        end: createDateTime(0, 11, 0),
        resource: {
            medicoId: 'doc-1',
            pacienteId: 'pac-2',
            medico: 'Dr. García',
            paciente: 'María López',
        },
    },
    {
        id: 3,
        title: 'Carlos Ruiz - Dr. Martínez',
        start: createDateTime(0, 11, 30),
        end: createDateTime(0, 12, 0),
        resource: {
            medicoId: 'doc-2',
            pacienteId: 'pac-3',
            medico: 'Dr. Martínez',
            paciente: 'Carlos Ruiz',
        },
    },
    {
        id: 4,
        title: 'Ana Fernández - Dr. García',
        start: createDateTime(1, 9, 0),
        end: createDateTime(1, 9, 30),
        resource: {
            medicoId: 'doc-1',
            pacienteId: 'pac-4',
            medico: 'Dr. García',
            paciente: 'Ana Fernández',
        },
    },
    {
        id: 5,
        title: 'Pedro Sánchez - Dr. Martínez',
        start: createDateTime(1, 14, 0),
        end: createDateTime(1, 14, 30),
        resource: {
            medicoId: 'doc-2',
            pacienteId: 'pac-5',
            medico: 'Dr. Martínez',
            paciente: 'Pedro Sánchez',
        },
    },
    {
        id: 6,
        title: 'Laura García - Dr. Rodríguez',
        start: createDateTime(2, 10, 0),
        end: createDateTime(2, 10, 30),
        resource: {
            medicoId: 'doc-3',
            pacienteId: 'pac-6',
            medico: 'Dr. Rodríguez',
            paciente: 'Laura García',
        },
    },
    {
        id: 7,
        title: 'Roberto Díaz - Dr. García',
        start: createDateTime(3, 16, 0),
        end: createDateTime(3, 16, 30),
        resource: {
            medicoId: 'doc-1',
            pacienteId: 'pac-7',
            medico: 'Dr. García',
            paciente: 'Roberto Díaz',
        },
    },
    {
        id: 8,
        title: 'Carmen Morales - Dr. Martínez',
        start: createDateTime(-1, 11, 0),
        end: createDateTime(-1, 11, 30),
        resource: {
            medicoId: 'doc-2',
            pacienteId: 'pac-8',
            medico: 'Dr. Martínez',
            paciente: 'Carmen Morales',
        },
    },
    {
        id: 9,
        title: 'Francisco Torres - Dr. Rodríguez',
        start: createDateTime(5, 9, 30),
        end: createDateTime(5, 10, 0),
        resource: {
            medicoId: 'doc-3',
            pacienteId: 'pac-9',
            medico: 'Dr. Rodríguez',
            paciente: 'Francisco Torres',
        },
    },
    {
        id: 10,
        title: 'Isabel Jiménez - Dr. García',
        start: createDateTime(7, 15, 30),
        end: createDateTime(7, 16, 0),
        resource: {
            medicoId: 'doc-1',
            pacienteId: 'pac-10',
            medico: 'Dr. García',
            paciente: 'Isabel Jiménez',
        },
    },
    {
        id: 11,
        title: 'Miguel Herrera - Dr. Martínez',
        start: createDateTime(0, 9, 0),
        end: createDateTime(0, 9, 30),
        resource: {
            medicoId: 'doc-2',
            pacienteId: 'pac-11',
            medico: 'Dr. Martínez',
            paciente: 'Miguel Herrera',
        },
    },
]
