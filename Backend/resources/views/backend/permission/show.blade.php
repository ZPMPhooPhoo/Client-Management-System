@extends('backend.layout.master')
@section('content')
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>Show Permission</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">Show Permission</li>
                </ol>
            </div>
        </div>
    </div><!-- /.container-fluid -->
</section>

<!-- Main content -->
<section class="content">
    <div class="container-fluid">
        <div class="row">
            <!-- left column -->
            <div class="col-md-10 m-auto">
                <!-- jquery validation -->
                <div class="card card-info">
                    <div class="card-header">
                        <h3 class="card-title">Show Permission <span class="align-items-end"><a href="{{route('permission.index')}}" class="btn btn-warning">Back</a></span></h3>
                        
                    </div><!-- /.card-header -->
                    
                    <!-- form start -->
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
                    </form><!-- /.form-end -->
                </div><!-- /.card -->
            </div><!--/.col (left) -->
            
            <!-- right column -->
            <div class="col-md-6">

            </div>
            <!--/.col (right) -->
        </div>
        <!-- /.row -->
    </div><!-- /.container-fluid -->
</section>
<!-- /.content -->
@endsection