@extends('layout.admin')

@section('content')


<table class="table table-hover">
    <thead>
    <tr>
        <th>
            id
        </th>

        <th>
            Email
        </th>
        <th>
            name
        </th>
        <th>
            avatar
        </th>
        <th>
            action
        </th>


    </tr>

    </thead>

    <tbody>
    @foreach ($allusers as $user)
        <tr>
            <td>
                {{ $user->id }}
            </td>
            <td>
                {{ $user->email }}
            </td>
            <td>
                {{ $user->name }}
            </td>

            <td>
               <img src=" {{ $user->avatar }}" height="50px" >
            </td>

            <td>
                <button onclick="deleteUser({{$user->id}})">Delete</button>
            </td>


        </tr>



    @endforeach


    </tbody>


</table>


@endsection