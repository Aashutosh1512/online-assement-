//os
export default [
  {
    id: 1,
    question: "What is the role of an operating system?",
    options: [
      "To manage hardware components",
      "To provide a user interface",
      "To process and execute application programs",
    ],
    answer: 0,
  },
  {
    id: 2,
    question: "What is a process in the context of operating systems?",
    options: [
      "A program in execution, including its current values of program counter, registers, and variables",
      "A file storage system",
      "A type of system call",
    ],
    answer: 0,
  },
  {
    id: 3,
    question: "What is a thread in the context of operating systems?",
    options: [
      "A program in execution, including its current values of program counter, registers, and variables",
      "A lightweight process that shares the same memory space and system resources as other threads within a process",
      "A unit of data storage",
    ],
    answer: 1,
  },
  {
    id: 4,
    question: "What is virtual memory in operating systems?",
    options: [
      "A memory management technique that uses physical memory only",
      "A memory management technique that combines RAM and disk space to extend available memory",
      "A type of system call",
    ],
    answer: 1,
  },
  {
    id: 5,
    question: "What is a file system in operating systems?",
    options: [
      "A system for organizing and storing computer files",
      "A process scheduling algorithm",
      "A communication protocol",
    ],
    answer: 0,
  },
  {
    id: 6,
    question: "What is the purpose of an interrupt in operating systems?",
    options: [
      "To provide a user interface",
      "To suspend the execution of a process",
      "To transfer control to the operating system in response to an event",
    ],
    answer: 2,
  },
  {
    id: 7,
    question: "What is a deadlock in operating systems?",
    options: [
      "A software interrupt triggered by an exceptional condition in the system",
      "A technique used to limit the CPU usage of a process",
      "A situation where two or more processes are unable to proceed because they are blocked waiting for each other to release resources",
    ],
    answer: 2,
  },
  {
    id: 8,
    question: "What is a page fault in operating systems?",
    options: [
      "A software interrupt triggered by an exceptional condition in the system",
      "An exception that occurs when a program tries to access a page of memory that is not currently in physical memory",
      "A technique to limit the number of pages in a virtual memory system",
    ],
    answer: 1,
  },
  {
    id: 9,
    question: "What is a semaphore in operating systems?",
    options: [
      "A synchronization object that provides a way for processes to communicate and coordinate their actions",
      "A data structure that improves the speed of data retrieval operations on a database table",
      "A view that provides a virtual representation of the data in one or more tables",
    ],
    answer: 0,
  },
  {
    id: 10,
    question: "What is a CPU scheduler in operating systems?",
    options: [
      "A program that manages the execution of other programs",
      "A component responsible for allocating resources to processes",
      "A type of system call",
    ],
    answer: 1,
  },
  {
    id: 11,
    question:
      "What is the purpose of the FAT file system in operating systems?",
    options: [
      "To manage the allocation of free disk space",
      "To provide a user interface",
      "To manage the execution of processes",
    ],
    answer: 0,
  },
  {
    id: 12,
    question: "What is the role of the kernel in operating systems?",
    options: [
      "To provide a user interface",
      "The central component that manages the system's resources and services",
      "To manage the execution of processes",
    ],
    answer: 1,
  },
  {
    id: 13,
    question: "What is a device driver in operating systems?",
    options: [
      "A program that manages the execution of other programs",
      "A component responsible for allocating resources to processes",
      "A software component that enables communication between the operating system and a hardware device",
    ],
    answer: 2,
  },
  {
    id: 14,
    question: "What is the purpose of the round-robin scheduling algorithm?",
    options: [
      "To allocate resources based on priority",
      "To assign a fixed time unit per process in a cyclic order",
      "To manage the execution of I/O operations",
    ],
    answer: 1,
  },
  {
    id: 15,
    question: "What is demand paging in virtual memory management?",
    options: [
      "A technique to allocate pages based on the demand from processes",
      "A method to transfer data between the main memory and secondary storage",
      "A system for organizing and storing computer files",
    ],
    answer: 0,
  },
  {
    id: 16,
    question: "What is the purpose of a system call in operating systems?",
    options: [
      "To provide a user interface",
      "To transfer control to the operating system to request a service",
      "To manage the execution of processes",
    ],
    answer: 1,
  },
];

export const answers3 = [0, 0, 1, 1, 0, 2, 2, 1, 0, 1, 0, 1, 2, 1, 0, 1];
