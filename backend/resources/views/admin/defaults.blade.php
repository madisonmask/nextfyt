@extends('layout.admin')

@section('content')

    <form action="/adminpanel/defaults/" method="POST">
        <div class="form-group">
            <label for="exerciseName">Exercise name:</label>
            <input type="text" class="form-control" id="exerciseName" name="exerciseName">
        </div>

        <div class="form-group">
            Muscles
            @foreach ($allMuscles as $muscle)
                <div class="checkbox">
                    <label><input type="checkbox" value="{{ $muscle->id }}  " name="muscles[]"> {{ $muscle->name }}
                    </label>
                </div>
            @endforeach
        </div>

        <div class="form-group">
        <div class="checkbox">
            <label><input type="checkbox" value="true" name="cardio"> Is cardio? </label>
        </div>
        </div>

        <div class="form-group">
            Difficulties
            @foreach ($allDifficulty as $difficulty)
                <div class="radio">
                    <label><input type="radio" name="difficulties">{{$difficulty->name}}</label>
                </div>
            @endforeach

        </div>

        <div class="form-group">
            Equipment
        @foreach ($allEquipment as $equipment)


            <div class="checkbox">
                <label><input type="checkbox" value="{{ $equipment->id }}  " name="equipment[]"> {{ $equipment->name }}
                </label>
            </div>

        @endforeach
</div>



        <div class="form-group">
            Images

        <label class="btn btn-default btn-file">
            Browse <input type="file" style="display: none;" name="image1">
        </label>

            <label class="btn btn-default btn-file">
                Browse <input type="file" style="display: none;" name="image2">
            </label>

            <label class="btn btn-default btn-file">
                Browse <input type="file" style="display: none;" name="image3">
            </label>

            <label class="btn btn-default btn-file">
                Browse <input type="file" style="display: none;" name="image4">
            </label>

            <label class="btn btn-default btn-file">
                Browse <input type="file" style="display: none;" name="image5">
            </label>

            <label class="btn btn-default btn-file">
                Browse <input type="file" style="display: none;" name="image6">
            </label>


        </div>

        <button type="submit" class="btn btn-default">Add</button>
    </form>



    <table class="table table-hover">
        <thead>
        <tr>
            <th> id</th>
            <th> name</th>
            <th> action</th>
        </tr>

        </thead>

        <tbody>
        @foreach ($allMuscles as $muscle)
            <tr>
                <td>                    {{ $muscle->id }}                </td>
                <td>                    {{ $muscle->name }}                </td>
                <td>
                    <button onclick="deleteMuscle({{$muscle->id}})">Delete</button>
                </td>
            </tr>
        @endforeach
        </tbody>

    </table>

@endsection