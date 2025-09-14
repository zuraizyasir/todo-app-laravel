<?php

namespace App\Actions;

use App\Models\Todo;

class TodoUpdateAction
{
    public function execute(Todo $todo, array $data): Todo
    {
        $todo->update([
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'due_date' => $data['due_date'] ?? null,
        ]);

        return $todo->fresh();
    }
}