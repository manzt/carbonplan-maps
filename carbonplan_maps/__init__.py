# flake8: noqa

from importlib.metadata import PackageNotFoundError, version

try:
    __version__ = version('carbonplan')
except PackageNotFoundError:
    __version__ = 'unknown'

from ._widget import Widget
