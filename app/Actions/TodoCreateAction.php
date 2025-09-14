<?php

namespace App\Actions;

use App\Models\Todo;

class TodoCreateAction
{
    public function execute(array $data): Todo
    {
        return Todo::create([
            'user_id' => auth()->id(),
            'title' => $data['title'],
            'description' => $data['description'] ?? null,
            'status' => $data['status'],
            'due_date' => $data['due_date'] ?? null,
        ]);
    }
}