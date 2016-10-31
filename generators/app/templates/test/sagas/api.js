import { expect } from 'chai';
import { call, put } from 'redux-saga/effects';
import sinon from 'sinon';
const { describe, it } = global;

import { callAPI, modelize } from '../../src/sagas/api';
import { action, ERROR } from '../../src/actions';
import { FAILURE } from '../../src/constants/code';

describe('sagas', () => {
  describe('callAPI', () => {
    describe('with error request', () => {
      it('should be caught', () => {
        const payload = null;
        const api = sinon.spy();
        const error = new Error('oops');
        const gen = callAPI(api, { payload, meta: {} });
        expect(gen.next().value).to.be.eql(
          call(api, payload)
        );

        expect(gen.next(error).value).to.be.eql(
          put(action(ERROR.CATCH, error))
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });

    describe('with failure code', () => {
      it('should be fail', () => {
        const payload = null;
        const api = sinon.spy();
        const types = {
          FAILURE: 'FAILURE',
        };
        const res = { code: FAILURE };
        const gen = callAPI(api, { payload, meta: { types } });
        expect(gen.next().value).to.be.eql(
          call(api, payload)
        );

        expect(gen.next(res).value).to.be.eql(
          put(action(types.FAILURE, res, payload))
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });

    describe('with success code', () => {
      it('should be success', () => {
        const payload = null;
        const api = sinon.spy();
        const types = {
          SUCCESS: 'SUCCESS',
        };
        const schemas = {};
        const models = {};
        const res = {};
        const gen = callAPI(api, { payload, meta: { types, schemas, models } });
        const modelized = {};
        expect(gen.next().value).to.be.eql(
          call(api, payload)
        );

        expect(gen.next(res).value).to.be.eql(
          call(modelize, res, schemas, models)
        );

        expect(gen.next(modelized).value).to.be.eql(
          put(action(types.SUCCESS, modelized))
        );

        expect(gen.next()).to.be.eql({
          done: true,
          value: undefined,
        });
      });
    });
  });
});
