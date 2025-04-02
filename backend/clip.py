'''import ffmpeg
import os

def time_to_seconds(timestamp):
    """Convert timestamp format 'MM:SS' or 'HH:MM:SS' to total seconds."""
    parts = list(map(int, timestamp.split(":")))
    if len(parts) == 2:  # MM:SS
        return parts[0] * 60 + parts[1]
    elif len(parts) == 3:  # HH:MM:SS
        return parts[0] * 3600 + parts[1] * 60 + parts[2]
    return int(timestamp)  # If it's already in seconds

def generate_clip(video_id: str, start_time: str, end_time: str = None, duration: str = None) -> str:
    """
    Extracts a video clip from the original video using FFmpeg.

    Args:
        video_id (str): ID of the video file.
        start_time (str): Start time in "MM:SS" or seconds.
        end_time (str, optional): End time in "MM:SS" or seconds. Defaults to None.
        duration (str, optional): Clip duration in "MM:SS" or seconds. Defaults to None.

    Returns:
        str: Path to the generated clip.
    """
    input_file = f"uploads/{video_id}.mp4"
    output_file = f"uploads/{video_id}_{int(time_to_seconds(start_time))}.mp4"

    input_kwargs = {'ss': time_to_seconds(start_time)}  # This sets the start time

    if duration:
        input_kwargs['t'] = time_to_seconds(duration)  # Duration as the length of the clip
    elif end_time:
        input_kwargs['to'] = time_to_seconds(end_time)  # Using 'to' for the end time

    print(f"Checking file: {input_file}")
    print(f"File exists: {os.path.exists(input_file)}")

    # Run FFmpeg with adjusted input_kwargs
    ffmpeg.input(input_file, **input_kwargs).output(output_file, c='copy').run()

    return output_file  # Return path to the new clip


# Example usage:
#video_id = "b20e6df9-408b-45cb-abd9-d9909cbab9e0_Math Video"
#start_time = "00:30"  # 1 minute 30 seconds
#end_time = "00:45"  # 2 minutes

#output_path = generate_clip(video_id, start_time, end_time=end_time)'''
