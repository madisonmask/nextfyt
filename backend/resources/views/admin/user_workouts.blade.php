@extends('layout.admin')

@section('content')
<h2>User workouts</h2>

<table class="table table-hover datTable">
    <thead>
    <tr>
        <th>
            id
        </th>
        <th>
            user
        </th>
        <th>
          Workout  name
        </th>
        <th>
            cardio
        </th>

         <th>
            action
        </th>
    </tr>
    </thead>

    <tbody>
    @foreach ($exportWorkouts as $workout)
        <tr>
            <td>
                {{ $workout->id }}
            </td>
            <td>
                @isset($workout->user->name )
                {{ $workout->user->name }}
                @else
                    TESTuser
                @endisset




            </td>
            <td>
                {{ $workout->name }}
            </td>

            <td>
                {{ $workout->cardio }}
            </td>

            <td>
                <button onclick="deleteWorkout({{$workout->id}})">Delete</button>
            </td>
        </tr>

    @endforeach


    </tbody>


</table>


@endsection