<?php

namespace App\Repository\Invoice;

interface InvoiceRepoInterface
{
    public function get();
    public function show($id);
}