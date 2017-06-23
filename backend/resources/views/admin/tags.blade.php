@extends('layout.admin')

@section('content')


    <form action="/adminpanel/catalog/tags/add" method="POST">
        <div class="form-group">
            <label for="tagName">Tag name:</label>
            <input type="text" class="form-control" id="tagName" name="tagName">


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
            popularity
        </th>

         <th>
            action
        </th>


    </tr>

    </thead>

    <tbody>
    @foreach ($allTags as $tag)
        <tr>
            <td>
                {{ $tag->id }}
            </td>

            <td>
                {{ $tag->name }}
            </td>

            <td>
                {{ $tag->popularity }}
            </td>

            <td>
                <button onclick="deleteTag({{$tag->id}})">Delete</button>
            </td>


        </tr>



    @endforeach


    </tbody>


</table>


@endsection