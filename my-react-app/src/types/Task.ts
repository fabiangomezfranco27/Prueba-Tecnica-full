export interface Task {
    id: number;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
    userId: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface TaskCardProps {
    task: Task;
    onDelete: () => void;
    onEdit: () => void;
    onView: () => void;
}

export interface CreateTaskDto {
    title: string;
    description: string;
    dueDate: string;
    completed?: boolean;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {
    id: number;
}