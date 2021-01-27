import React from 'react';
import { KanaType, PracticeMode } from '../../../constants';
import AnswerButtonCharacter from '../AnswerButtonCharacter';
import AnswerButtonReading from '../AnswerButtonReading';
import createAnswerButton from './createAnswerButton';

describe('createAnswerButton', () => {
	it('should return an AnswerButtonCharacter', () => {
		const answerButton = createAnswerButton(
			PracticeMode.ChooseCharacter,
			0,
			() => {},
			false,
			{
				hiraganaPath: '',
				katakanaPath: '',
				name: '',
				family: '',
			},
			KanaType.Hiragana,
			'',
			<></>
		);
		expect(answerButton?.type).toEqual(AnswerButtonCharacter);
	});

	it('should return an AnswerButtonReading', () => {
		const answerButton = createAnswerButton(
			PracticeMode.ChooseReading,
			0,
			() => {},
			false,
			{
				hiraganaPath: '',
				katakanaPath: '',
				name: '',
				family: '',
			},
			KanaType.Hiragana,
			'',
			<></>
		);
		expect(answerButton?.type).toEqual(AnswerButtonReading);
	});

	it('should return undefined if the practice mode is undefined', () => {
		const answerButton = createAnswerButton(
			PracticeMode.Unselected,
			0,
			() => {},
			false,
			{
				hiraganaPath: '',
				katakanaPath: '',
				name: '',
				family: '',
			},
			KanaType.Hiragana,
			'',
			<></>
		);
		expect(answerButton).toBe(undefined);
	});
});
