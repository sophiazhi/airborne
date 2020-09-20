import unittest
from api import *

class testApi(unittest.TestCase):
    def setUp(self):
        self.forms = [
            {"airline": "delta",
            "departure": "boston",
            "time": "morning"},
            {"airline": "united",
            "departure": "nyc",
            "time": "morning"}]

    def test__query_forms__all_fields_any(self):
        query = {"airline": "any",
        "departure": "any",
        "time": "any"}

        actual = query_forms(self.forms, query)

        self.assertEqual(actual, self.forms, "expected all forms")
    
    def test__query_forms__one_field_specified(self):
        query = {"airline": "any",
        "departure": "nyc",
        "time": "any"}

        actual = query_forms(self.forms, query)
        expected_form = [{"airline": "united",
            "departure": "nyc",
            "time": "morning"}]

        self.assertEqual(actual, expected_form, "expected only nyc form")
    
    def test__query_forms__one_field_specified_lowercase(self):
        query = {"airline": "any",
        "departure": "NYc",
        "time": "any"}

        actual = query_forms(self.forms, query)
        expected_form = [{"airline": "united",
            "departure": "nyc",
            "time": "morning"}]

        self.assertEqual(actual, expected_form, "expected only nyc form")
    
    def test__query_forms__all_forms_fail_query(self):
        query = {"airline": "any",
        "departure": "chicago",
        "time": "any"}

        actual = query_forms(self.forms, query)

        self.assertEqual(actual, [], "expected 0 forms")

if __name__ == '__main__':
    unittest.main()