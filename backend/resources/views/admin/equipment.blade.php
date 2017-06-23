@extends('layout.admin')

@section('content')


    <form action="/adminpanel/catalog/equipment/add" method="POST">
        <div class="form-group">
            <label for="equipment">Equipment name:</label>
            <input type="text" class="form-control" id="equipment" name="equipment">
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
    @foreach ($allEquipment as $equipment)
        <tr>
            <td>
                {{ $equipment->id }}
            </td>

            <td>
                {{ $equipment->name }}
            </td>


            <td>
                <button onclick="deleteEquipment({{$equipment->id}})">Delete</button>
            </td>


        </tr>



    @endforeach


    </tbody>


</table>


@endsection