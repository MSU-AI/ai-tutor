from moviepy import VideoFileClip
import os
import ffmpeg

def clip_video(input_path, output_path, start_time, duration=None, end_time=None):
    """
    Clips a video using ffmpeg-python.

    Args:
        input_path (str): Path to the input video file.
        output_path (str): Path to the output video file.
        start_time (str): Start time in HH:MM:SS format (e.g., "00:01:30").
        duration (str, optional): Duration of the clip in HH:MM:SS format (e.g., "00:00:10"). Defaults to None.
        end_time (str, optional): End time of the clip in HH:MM:SS format (e.g., "00:01:40"). Defaults to None.
    """
    input_kwargs = {'ss': start_time}
    if duration:
        input_kwargs['t'] = duration
    elif end_time:
         input_kwargs['to'] = end_time

    ffmpeg.input(input_path, **input_kwargs).output(output_path, c='copy').run()



def time_to_seconds(timestamp):
    """Convert timestamp format 'MM:SS' to total seconds."""
    minutes, seconds = map(int, timestamp.split(":"))
    return minutes * 60 + seconds


def get_clip_from_prompt(video_filename, prompt):
    
        video_path = os.path.join("uploads", video_filename)

#Extract start and end timestamps from the prompt
        timestamps = prompt.split()  # Expecting "MM:SS MM:SS" format
        if len(timestamps) != 2:
            print("Invalid input format. Please use 'MM:SS MM:SS'.")
            return None

        start_time = time_to_seconds(timestamps[0])
        end_time = time_to_seconds(timestamps[1])

        return clip_video(video_path, "output.mp4", start_time, end_time=end_time)
    
    

#Example usage
if __name__ == "__main__":
    video_filename = "b20e6df9-408b-45cb-abd9-d9909cbab9e0_Math Video.mp4"  # Video stored in uploads folder
    prompt = input("Enter start and end timestamps (MM:SS MM:SS): ")  # Get user input

    output_video = get_clip_from_prompt(video_filename, prompt)
    if output_video:
        print(f"Clipped video available at: {output_video}")