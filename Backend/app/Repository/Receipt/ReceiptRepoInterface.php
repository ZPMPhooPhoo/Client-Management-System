<?php

namespace App\Repository\Receipt;

interface ReceiptRepoInterface
{
    public function get();
    public function show($id);
}