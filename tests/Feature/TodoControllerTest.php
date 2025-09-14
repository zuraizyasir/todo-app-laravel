<?php

namespace Tests\Feature;

use App\Models\Todo;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class TodoControllerTest extends TestCase
{
    use RefreshDatabase;

    protected $user;
    protected $token;

    protected function setUp(): void
    {
        parent::setUp();
        $this->artisan('migrate');
        $this->user = User::factory()->create();
        $this->token = $this->user->createToken('test-token')->plainTextToken;
    }

    /** @test */
    public function it_can_list_todos_with_filters()
    {
        Todo::factory()->create([
            'user_id' => $this->user->id,
            'title' => 'Test Todo',
            'description' => 'Test description',
            'status' => 'pending',
            'due_date' => '2025-09-15',
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer $this->token"])
            ->getJson('/api/todos?status=pending&due_date=2025-09-15');

        $response->assertStatus(200)
            ->assertJsonCount(1, 'data')
            ->assertJsonFragment(['title' => 'Test Todo', 'description' => 'Test description']);
    }

    /** @test */
    public function it_can_create_a_todo()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer $this->token"])
            ->postJson('/api/todos', [
                'title' => 'New Todo',
                'description' => 'New description',
                'status' => 'pending',
                'due_date' => '2025-09-15',
            ]);

        $response->assertStatus(201)
            ->assertJsonFragment(['title' => 'New Todo', 'description' => 'New description']);

        $this->assertDatabaseHas('todos', [
            'user_id' => $this->user->id,
            'title' => 'New Todo',
            'description' => 'New description',
        ]);
    }

    /** @test */
    public function it_fails_to_create_todo_with_invalid_data()
    {
        $response = $this->withHeaders(['Authorization' => "Bearer $this->token"])
            ->postJson('/api/todos', [
                'title' => '',
                'status' => 'invalid',
                'due_date' => 'invalid-date',
            ]);

        $response->assertStatus(422)
            ->assertJsonValidationErrors(['title', 'status', 'due_date']);
    }

    /** @test */
    public function it_can_update_own_todo()
    {
        $todo = Todo::factory()->create([
            'user_id' => $this->user->id,
            'title' => 'Old Todo',
            'description' => 'Old description',
            'status' => 'pending',
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer $this->token"])
            ->putJson("/api/todos/{$todo->id}", [
                'title' => 'Updated Todo',
                'description' => 'Updated description',
                'status' => 'completed',
                'due_date' => '2025-09-16',
            ]);

        $response->assertStatus(200)
            ->assertJsonFragment(['title' => 'Updated Todo', 'description' => 'Updated description']);

        $this->assertDatabaseHas('todos', [
            'id' => $todo->id,
            'title' => 'Updated Todo',
            'description' => 'Updated description',
            'status' => 'completed',
        ]);
    }

    /** @test */
    public function it_cannot_update_another_users_todo()
    {
        $otherUser = User::factory()->create();
        $todo = Todo::factory()->create([
            'user_id' => $otherUser->id,
            'status' => 'pending',
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer $this->token"])
            ->putJson("/api/todos/{$todo->id}", [
                'title' => 'Updated Todo',
                'description' => 'Updated description',
                'status' => 'completed',
            ]);

        $response->assertStatus(403);
    }

    /** @test */
    public function it_can_delete_own_todo()
    {
        $todo = Todo::factory()->create([
            'user_id' => $this->user->id,
            'status' => 'pending',
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer $this->token"])
            ->deleteJson("/api/todos/{$todo->id}");

        $response->assertStatus(200);
        $this->assertDatabaseMissing('todos', ['id' => $todo->id]);
    }

    /** @test */
    public function it_cannot_delete_another_users_todo()
    {
        $otherUser = User::factory()->create();
        $todo = Todo::factory()->create([
            'user_id' => $otherUser->id,
            'status' => 'pending',
        ]);

        $response = $this->withHeaders(['Authorization' => "Bearer $this->token"])
            ->deleteJson("/api/todos/{$todo->id}");

        $response->assertStatus(403);
    }

    /** @test */
    public function it_cannot_access_todos_without_authentication()
    {
        $response = $this->getJson('/api/todos');
        $response->assertStatus(401);
    }
}