from llm import LLM

import pydantic


class LLM_Connect():
    def __init__(self):
        self.llm = LLM()
    
    def processText(self, text):
        USER = '''
        Read the terms of service document carefully and analyze the risks involved in each category.
        In each category, give me a risk score in numbers
        from 0 to 5, with 0 being the safest, and 5 being the most dangerous. 
        Then explain the risks involved. 
        Then give me the exact quoted clauses in the document that describes the risk.
        Here is the document: 
        '''

        out = self.llm.query(text, _RiskInfo)
        return out


# INTERNAL
class _RiskItem(pydantic.BaseModel):
    risk_score: int
    explanation: str
    quote: str

class _RiskInfo(pydantic.BaseModel):
    licence_to_use_user_content: _RiskItem
    user_data: _RiskItem
    renewal_of_service: _RiskItem
    limited_liability: _RiskItem
    suspension_of_service: _RiskItem


if __name__ == '__main__': 
    c = LLM_Connect()
    with open("test.txt", 'r', encoding='utf-8') as f:
        text = f.read()
    out = c.processText(text)
    print(out)