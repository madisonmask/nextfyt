@extends('layout.admin')

@section('content')


    <form action="/adminpanel/catalog/muscles/add" method="POST">
        <div class="form-group">
            <label for="muscle">Muscle name:</label>
            <input type="text" class="form-control" id="muscle" name="muscle">
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
            action
        </th>


    </tr>

    </thead>

    <tbody>
    @foreach ($allMuscles as $muscle)
        <tr>
            <td>
                {{ $muscle->id }}
            </td>

            <td>
                {{ $muscle->name }}
            </td>


            <td>
                <button onclick="deleteMuscle({{$muscle->id}})">Delete</button>
            </td>


        </tr>



    @endforeach


    </tbody>


</table>


@endsection