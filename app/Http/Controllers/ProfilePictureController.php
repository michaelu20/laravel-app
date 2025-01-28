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

        try {
            // Ensure the profile-pictures directory exists
            Storage::disk('public')->makeDirectory('profile-pictures');

            // Generate a unique filename
            $filename = uniqid() . '_' . time() . '.' . $request->file('profile_picture')->getClientOriginalExtension();
            
            // Store the new file
            $path = $request->file('profile_picture')->storeAs(
                'profile-pictures',
                $filename,
                'public'
            );
            
            // Delete old profile picture if it exists
            if ($request->user()->profile_picture) {
                Storage::disk('public')->delete($request->user()->profile_picture);
            }

            // Update user with new profile picture path
            $request->user()->update([
                'profile_picture' => $path
            ]);

            // Return a redirect back to ensure page refresh
            return back();
        } catch (\Exception $e) {
            return back()->withErrors(['profile_picture' => 'Failed to upload profile picture.']);
        }
    }
}
