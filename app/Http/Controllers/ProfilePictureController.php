<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfilePictureController extends Controller
{
    public function update(Request $request)
    {
        $request->validate([
            'profile_picture' => 'required|image|max:2048', // 2MB max
        ]);

        $path = $request->file('profile_picture')->store('profile-pictures', 'public');
        
        // Delete old profile picture if it exists
        if ($request->user()->profile_picture) {
            Storage::disk('public')->delete($request->user()->profile_picture);
        }

        $request->user()->update([
            'profile_picture' => $path
        ]);

        return back();
    }
}