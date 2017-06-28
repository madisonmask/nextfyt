@extends('layout.admin')

@section('content')


    @if ($errors->any())
        <div class="alert alert-danger">
            <ul>
                @foreach ($errors->all() as $error)
                    <li>{{ $error }}</li>
                @endforeach
            </ul>
        </div>
    @endif



    <form action="/adminpanel/defaults" enctype="multipart/form-data" method="POST">
        <div class="form-group">
            <label for="exerciseName">Exercise name:</label>
            <input type="text" class="form-control" id="exerciseName" name="exerciseName">
        </div>

        <div class="row">
            <div class="col-sm-4">
                <div class="form-group">
                    Muscles
                    @foreach ($allMuscles as $muscle)
                        <div class="checkbox">
                            <label><input type="checkbox" value="{{ $muscle->id }}  "
                                          name="muscles[]"> {{ $muscle->name }}
                            </label>
                        </div>
                    @endforeach
                </div>

            </div>

            <div class="col-sm-4">
                <div class="form-group">
                    Difficulties
                    @foreach ($allDifficulty as $index=>$difficulty)
                        <div class="radio">
                            <label><input type="radio" name="difficulties" value="{{$difficulty->id}}"
                                          @if($index==0)  checked @endif >{{$difficulty->name}}</label>
                        </div>
                    @endforeach
                </div>

            </div>

            <div class="col-sm-4">
                <div class="form-group">
                    Equipment
                    @foreach ($allEquipment as $equipment)
                        <div class="checkbox">
                            <label><input type="checkbox" value="{{ $equipment->id }}  "
                                          name="equipment[]"> {{ $equipment->name }}
                            </label>
                        </div>
                    @endforeach
                </div>
            </div>

        </div>


        <div class="form-group">
            <div class="checkbox">
                <label><input type="checkbox" value="true" name="cardio"> Is cardio? </label>
            </div>
        </div>


        <div class="form-group">
            Images

            <p>1</p>
            <label class="control-label">Select File</label>
            <input id="input-1" name="file1" type="file" multiple class="file-loading">


            <p>2</p>
            <label class="control-label">Select File</label>
            <input id="input-2" name="file2" type="file" multiple class="file-loading">

            <p>3</p>
            <label class="control-label">Select File</label>
            <input id="input-3" name="file3" type="file" multiple class="file-loading">

            <p>4</p>
            <label class="control-label">Select File</label>
            <input id="input-4" name="file4" type="file" multiple class="file-loading">

            <p>5</p>
            <label class="control-label">Select File</label>
            <input id="input-5" name="file5" type="file" multiple class="file-loading">

            <p>6</p>
            <label class="control-label">Select File</label>
            <input id="input-6" name="file6" type="file" multiple class="file-loading">


        </div>
        <div class="form-group">
            <h2>repeat count</h2>
            <select name="repeat_count" class="form-control">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
            </ion-item>

            <select name="repeat_type" class="form-control">
                <option value="movements"> Compound movements</option>
                <option value="steps"> Sets</option>
            </select>
        </div>

        <div class="form-group">
            <h2>Length count</h2>
            <input type="number" placeholder="enter length count" name="length_count" value="10" class="form-control">
            <select name="length_type" class="form-control">
                <option value="Seconds"> Seconds</option>
                <option value="Minutes"> Minutes</option>
                <option value="Reps"> Reps</option>
            </select>
        </div>

        <button type="submit" class="btn btn-primary">Add</button>
    </form>



    <table class="table table-hover">

        <h1> Created Exercises </h1>
        <thead>
        <tr>
            <th> id</th>
            <th> name</th>
            <th> action</th>
        </tr>

        </thead>

        <tbody>
        @foreach ($allDefault as $exercise)
            <tr>
                <td>                    {{ $exercise->id }}                </td>
                <td>                    {{ $exercise->name }}                </td>
                <td>
                    <button onclick="deleteCreated({{$exercise->id}})">Delete</button>
                </td>
            </tr>
        @endforeach
        </tbody>

    </table>

@endsection