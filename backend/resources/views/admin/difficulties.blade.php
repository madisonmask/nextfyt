@extends('layout.admin')

@section('content')


    <form action="/adminpanel/catalog/difficulty/add" method="POST">
        <div class="form-group">
            <label for="difficulty">Difficulty name:</label>
            <input type="text" class="form-control" id="difficulty" name="difficulty">

            <label for="level">Difficulty level:</label>
            <input type="number" class="form-control" id="level" name="level">
            *Bigger level means harder workout

        </div>
        <button type="submit" class="btn btn-default">Add</button>
    </form>

<table class="table table-hover">
    <thead>
    <tr>
        <th>
            id
        </th>
        <th>
            name
        </th>
        <th>
            difficulty_level
        </th>

         <th>
            action
        </th>


    </tr>

    </thead>

    <tbody>
    @foreach ($allDifficulty as $difficulty)
        <tr>
            <td>
                {{ $difficulty->id }}
            </td>

            <td>
                {{ $difficulty->name }}
            </td>

            <td>
                {{ $difficulty->difficulty_level }}
            </td>

            <td>
                <button onclick="deleteDifficulty({{$difficulty->id}})">Delete</button>
            </td>


        </tr>



    @endforeach


    </tbody>


</table>


@endsection