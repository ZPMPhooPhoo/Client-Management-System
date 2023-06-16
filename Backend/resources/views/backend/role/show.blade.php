@extends('backend.layout.master')
@section('content')
<div class="container">
    <br><br>
    <h1>Show Role </h1>
    
    <form method="post" class="mt-3">
        @csrf
        <table class="table table-light mt-3">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">id</th>
                <th scope="col">name</th>                
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td> {{ $count = 1 }} </td>
                    <td> {{  "ID - " . $data->id }}</td>
                    <td> {{ $data->name }} </td>
                </tr>
            </tbody>
        </table>
        <a href="{{route('role.index')}}" class="btn btn-warning">Back</a>
    
    </form>
</div>
@endsection