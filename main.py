import webview
import win32gui
import win32api
import win32con
import threading
import time
import ctypes

WIDTH_TO_HEIGHT_RATIO = 1.3131944444444444444444444444444


def thread_function():
    hwnd = win32gui.FindWindow(None, "Calendar")
    if (hwnd != 0):
        # win32gui.SetWindowLong(hwnd, -20, -0x00040000)
        win32gui.SetWindowLong(hwnd, -20, 0x20 | 0x00000080 | 0x00080000)
        win32gui.SetLayeredWindowAttributes(
            hwnd, win32api.RGB(0, 0, 0), 220, win32con.LWA_ALPHA)
        return
    time.sleep(1)
    return thread_function()


window = webview.create_window('Calendar', 'D:/Dev/my_applications/week_calendar/web/main.html',
                               frameless=True, width=int(ctypes.windll.user32.GetSystemMetrics(1)*WIDTH_TO_HEIGHT_RATIO), height=int(ctypes.windll.user32.GetSystemMetrics(1)))

x = threading.Thread(target=thread_function, args=())
x.start()

webview.start()
