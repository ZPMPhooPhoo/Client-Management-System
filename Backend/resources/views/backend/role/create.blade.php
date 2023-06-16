@extends('backend.layout.master')
@section('content')
<!-- Content Header (Page header) -->
<section class="content-header">
    <div class="container-fluid">
        <div class="row mb-2">
            <div class="col-sm-6">
                <h1>New Role</h1>
            </div>
            <div class="col-sm-6">
                <ol class="breadcrumb float-sm-right">
                    <li class="breadcrumb-item"><a href="#">Home</a></li>
                    <li class="breadcrumb-item active">New Role</li>
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
                        <h3 class="card-title">New Role</h3>
                    </div><!-- /.card-header -->
                    
                    <!-- form start -->
                    <form method="post" action="{{ route('role.store')}}" class="form-horizontal">
                        @csrf
                        <div class="card-body">
                            <div class="form-group row">
                                <label for="name" class="col-sm-2 col-form-label">Name</label>
                                <div class="col-sm-10">
                                <input type="text" class="form-control" name="name" placeholder="Enter Name">
                                @if($errors->has('name'))
                                    <div class="error text-danger">{{$errors->first('name') }}</div>
                                @endif
                                </div>                                
                            </div>

                            <!-- iCheck -->
                            <div class="card card-success">
                                
                                <div class="card-body">
                                <!-- Minimal style -->
                                    <div class="row">
                                        @foreach ($data as $val)
                                        <div class="col-sm-6">
                                        <!-- checkbox -->                      
                                        <div class="form-group clearfix">
                                            <div class="form-check">
                                                <input class="form-check-input" type="checkbox" name="permission_arr[]" value="{{$val->id}}" id="flexCheckDefault">
                                                <label class="form-check-label" for="flexCheckDefault">
                                                    {{ $val->name }}
                                                </label>
                                            </div>                        
                                        </div>
                                        </div>
                                        @endforeach
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- /.card-body -->
                        <div class="card-footer">
                          <button type="submit" class="btn btn-info">Submit</button>
                          <a href="{{route('role.index')}}" class="btn btn-default float-right">Cancel</a>
                        </div>
                        <!-- /.card-footer -->
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