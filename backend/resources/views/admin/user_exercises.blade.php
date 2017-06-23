@extends('layout.admin')

@section('content')
<h2>User exercises</h2>

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
          Exercise  name
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
    @foreach ($exportExercise as $exercise)
        <tr>
            <td>
                {{ $exercise->id }}
            </td>
            <td>
                @isset($exercise->user->name )
                {{ $exercise->user->name }}
                @else
                    TESTuser
                @endisset




            </td>
            <td>
                {{ $exercise->name }}
            </td>

            <td>
                {{ $exercise->cardio }}
            </td>

            <td>
                <button onclick="deleteExercise({{$exercise->id}})">Delete</button>
            </td>
        </tr>

    @endforeach


    </tbody>


</table>


@endsection